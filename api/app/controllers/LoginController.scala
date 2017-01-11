package controllers

import com.google.inject.Inject
import org.slf4j.{Logger, LoggerFactory}
import persistence.service.{User, Users}
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.Future

class LoginController @Inject()(users: Users) extends RestAsyncController {

  implicit val credentialsReads: Reads[(String, String)] =
    (JsPath \ "name").read[String] and (JsPath \ "password").read[String] tupled

  val logger: Logger = LoggerFactory.getLogger(getClass)
  val userNotFound = Results.Unauthorized("Such used is not exists")

  def login = Action.async[JsValue](BodyParsers.parse.json) { request =>
    val params = request.body.validate(credentialsReads)
    if (params.isError) Future(userNotFound) else {
      val credentials = params.get
      logger.debug("attempt to login with " + credentials)
      users.findByName(credentials._1) map {
        case Some(User(Some(id), credentials._1, credentials._2, roles)) =>
          Ok(Json.toJson(User(Some(id), credentials._1, "", roles)))
        case _ => userNotFound
      }
    }
  }

}
