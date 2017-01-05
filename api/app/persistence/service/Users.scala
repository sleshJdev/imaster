package persistence.service

import com.google.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.{Json, OFormat}
import slick.driver.JdbcProfile

import scala.concurrent.Future

case class User(
                 id: Option[Long],
                 name: String,
                 password: String,
                 var roles: List[Role] = List.empty)

object User {
  implicit val format: OFormat[User] = Json.format[User]
}

class Users @Inject()(protected val dbConfigProvider: DatabaseConfigProvider,
                      protected val userCrRole: UserCrRole,
                      protected val roles: Roles)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  private val models = TableQuery[UserTable]

  def all: Future[Seq[User]] = db.run(models.result)

  def insert(user: User): Future[Int] = {
    val query = (models returning models.map(_.id) into ((user, id) => id)) += user
    db.run(query).map(_.toInt)
  }

  def findByName(name: String): Future[Option[User]] = {
    db.run(models.filter(_.name === name).joinRoles.result).map(_.toUsers.headOption)
  }

  def getById(id: Long): Future[Option[User]] = db.run(models.filter(_.id === id).joinRoles.result).map(_.toUsers.headOption)

  def getAll: Future[Seq[User]] = db.run(models.joinRoles.result).map(_.toUsers)

  class UserTable(tag: Tag) extends Table[User](tag, Some("main"), "user") {
    def id: Rep[Long] = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name: Rep[String] = column[String]("name")

    def password: Rep[String] = column[String]("password")

    type Data = (Option[Long], String, String)

    def toUser: Data => User = {
      case (id, name, password) => User(id, name, password)
    }

    def fromUser: PartialFunction[User, Option[Data]] = {
      case User(id, name, password, _) => Option((id, name, password))
    }

    override def * = (id.?, name, password) <> (toUser, fromUser)
  }

  implicit class UserExtension[C[_]](query: Query[UserTable, User, C]) {
    def joinRoles = query
      .join(userCrRole.models).on(_.id === _.userId)
      .join(roles.models).on(_._2.roleId === _.id)
  }

  implicit class UserExtendedExtension(list: Seq[((User, (Long, Long)), Role)]) {
    def toUsers = {
      var map: Map[Long, User] = Map.empty
      list foreach {
        case ((u, _), r) =>
          val id = u.id.get
          val user = if (map.isDefinedAt(id)) {
            map(id)
          } else {
            map += id -> u
            u
          }
          user.roles = r :: user.roles;
        case _ => throw new IllegalArgumentException("bad data format")
      }
      map.values.toList
    }
  }

}



