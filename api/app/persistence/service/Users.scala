package persistence.service

import scala.concurrent.Future
import com.google.inject.Inject
import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import slick.driver.JdbcProfile

case class User(id: Option[Long], name: String, password: String)

class Users @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  private val Users = TableQuery[UserTable]

  def all: Future[Seq[User]] = db.run(Users.result)

  def insert(user: User): Future[Int] = {
    val query = (Users returning Users.map(_.id) into ((user, id) => id)) += user
    db.run(query).map(_.toInt)
  }

  def findByName(name: String): Future[Option[User]] = {
    db.run(Users.filter(_.name === name).result.headOption)
  }

  private class UserTable(tag: Tag) extends Table[User](tag, Some("main"), "user") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def password = column[String]("password")

    def * = (id.?, name, password) <> (User.tupled, User.unapply)
  }

}

