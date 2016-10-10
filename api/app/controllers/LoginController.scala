package controllers

import com.google.inject.Inject
import persistence.service.{User, Users}
import play.api.libs.json._
import play.api.mvc._

class LoginController @Inject()(users: Users) extends Controller {

  import play.api.libs.concurrent.Execution.Implicits.defaultContext

  implicit val userReads = Json.reads[User]
  implicit val userWrites = Json.writes[User]

  def login = Action.async(bodyParser = BodyParsers.parse.json) { request =>
    val user = request.body.as[User]
    users.findByName(user.name) map {
      dbuser => {
        dbuser match {
          case Some(User(Some(id), user.name, user.password)) => Ok(Json.toJson[User](user))
          case _ => Results.Unauthorized(Json.toJson(dbuser))
        }
      }
    }
  }

}
