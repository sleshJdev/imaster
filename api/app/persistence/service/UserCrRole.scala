package persistence.service

import com.google.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.driver.JdbcProfile

class UserCrRole @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val models = TableQuery[UserCrRolesTable]

  class UserCrRolesTable(tag: Tag) extends Table[(Long, Long)](tag, "user_cr_role") {
    def userId = column[Long]("user_id")

    def roleId = column[Long]("role_id")

    override def * = (userId, roleId)
  }

}

