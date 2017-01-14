package controllers

import com.google.inject.Inject
import dto.{SearchParams}
import org.slf4j.LoggerFactory
import persistence.service.Users
import play.api.libs.json.{JsValue, Json}
import play.api.mvc.{Action, BodyParsers}

import scala.concurrent.Future


class UserController @Inject()(private val users: Users) extends RestAsyncController {

  val logger = LoggerFactory.getLogger(getClass)

  def search = Action.async[JsValue](BodyParsers.parse.json) { request =>
    request.body.asOpt[SearchParams].map { params =>
      users.findAll(params).map(all => {
        Ok(Json.toJson(all.map(it => it.copy(password = ""))))
      })
    } getOrElse Future(NoContent)
  }

  def getById(id: Long) = Action.async { _ =>
    logger.debug("get user by id={}", id)
    users.getById(id).map { case Some(user) =>
      Ok(Json.toJson(user.copy(password = "")))
    }
  }

}
