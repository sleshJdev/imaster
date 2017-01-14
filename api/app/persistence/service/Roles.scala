package persistence.service

import com.google.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import slick.driver.JdbcProfile
import slick.lifted.ProvenShape

case class Role(id: Option[Long], name: String, description: String)

object Role {
  implicit val format = Json.format[Role]
}

class Roles @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val model = TableQuery[RoleTable]

  def getAll = db.run(model.result)

  class RoleTable(tag: Tag) extends Table[Role](tag, Some("main"), "role") {
    def id: Rep[Long] = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def name: Rep[String] = column[String]("name")
    def description: Rep[String] = column[String]("description")
    override def * : ProvenShape[Role] = (id.?, name, description) <> ((Role.apply _).tupled, Role.unapply)
  }

}
