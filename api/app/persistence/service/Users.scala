package persistence.service

import com.google.inject.Inject
import dto.{SearchParams, SortParams}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.Json
import slick.driver.JdbcProfile

import scala.concurrent.Future

case class User(id: Option[Long],
                name: String,
                password: String,
                var roles: List[Role] = List.empty)

object User {
  implicit val format = Json.format[User]
}

class Users @Inject()(protected val dbConfigProvider: DatabaseConfigProvider,
                      protected val userCrRole: UserCrRole,
                      protected val roles: Roles)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  private val model = TableQuery[UserTable]

  def insert(user: User): Future[Int] = {
    val query = (model returning model.map(_.id) into ((_, id) => id)) += user
    db.run(query).map(_.toInt)
  }

  def findByName(name: String) = db.run(model.filter(_.name === name).joinRoles.result).map(_.toUsers.headOption)

  def getById(id: Long) = db.run(model.filter(_.id === id).joinRoles.result).map(_.toUsers.headOption)

  def getAll = db.run(model.joinRoles.result).map(_.toUsers)

  def findAll(params: SearchParams) = {
    db.run(model.joinRoles.sortBy(params.sort match {
      case SortParams("name", asc) => if (asc) _._1._1.name.asc.nullsFirst else _._1._1.name.desc.nullsLast
      case SortParams(_, asc) => if (asc) _._1._1.id.asc.nullsFirst else _._1._1.id.desc.nullsLast
    }).result) map (_.toUsers)
  }


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
      .join(roles.model).on(_._2.roleId === _.id)
  }

  implicit class UserExtendedExtension(list: Seq[((User, (Long, Long)), Role)]) {
    val map =  scala.collection.mutable.LinkedHashMap.empty[Long, User]
    def toUsers = {
      list.foreach {
        case ((u, _), r) =>
          val user = map.getOrElseUpdate(u.id.get, u)
          user.roles = r :: user.roles
      }
      map.values toList
    }
  }

}



