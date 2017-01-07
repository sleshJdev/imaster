package controllers

import com.google.inject.Inject
import org.slf4j.LoggerFactory
import persistence.service.{User, Users}
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.Future

/**
  * Created by slesh on 12/19/16.
  */
class LoginController @Inject()(users: Users) extends Controller {

  import play.api.libs.concurrent.Execution.Implicits.defaultContext

  implicit val credentialsReads: Reads[(String, String)] =
      (JsPath \ "name").read[String] and
      (JsPath \ "password").read[String] tupled

  val logger = LoggerFactory.getLogger(getClass)

  def login = Action.async(bodyParser = BodyParsers.parse.json) { request =>
    request.body.validate(credentialsReads) match {
      case s: JsSuccess[(String, String)] =>
        logger.debug("attempt to login with " + s.value)
        users.findByName(s.value._1) map {
          dbuser => {
            dbuser match {
              case Some(User(Some(id), s.value._1, s.value._2, _)) =>
                Ok(Json.toJson(
                  User(dbuser.get.id, dbuser.get.name, "", dbuser.get.roles)))
              case _ => Results.Unauthorized("Such used is not exists")
            }
          }
        }
      case e: JsError => Future(Results.Unauthorized("Such used is not exists"))
    }
  }

}
