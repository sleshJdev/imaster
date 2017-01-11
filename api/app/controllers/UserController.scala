package controllers

import com.google.inject.Inject
import org.slf4j.LoggerFactory
import persistence.service.Users
import play.api.libs.json.Json
import play.api.mvc.Action


class UserController @Inject()(private val users: Users) extends RestAsyncController {

  val logger = LoggerFactory.getLogger(getClass)

  def all = Action.async { _ =>
    users.getAll.map(all => {
      Ok(Json.toJson(all.map(it => it.copy(password = ""))))
    })
  }

  def getById(id: Long) = Action.async { _ =>
    logger.debug("get user by id={}", id)
    users.getById(id).map { case Some(user) =>
      Ok(Json.toJson(user.copy(password = "")))
    }
  }

}
