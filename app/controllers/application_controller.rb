class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def auth
    code, state = params["code"], params["state"]
    data = GithubApi.get_oauth(get_access_token_url, code, state)
    Rails.logger.info data

    user_data = GithubApi.user_access(data["access_token"])
  end
end
