class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def auth
    code, state = params["code"], params["state"]
    response = GithubApi.get_oauth(code, state)
    access_token = Rack::Utils.parse_query(response)["access_token"]
    user_data = GithubApi.user_access(access_token)
    Rails.logger.info user_data
    redirect_to request.referer
  end

end
