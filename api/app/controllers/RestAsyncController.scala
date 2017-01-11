package controllers

import play.api.mvc._

import scala.concurrent.ExecutionContext

class RestAsyncController extends Controller {

  implicit val context: ExecutionContext = play.api.libs.concurrent.Execution.Implicits.defaultContext

}
