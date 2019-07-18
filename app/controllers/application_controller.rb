class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def auth
    code, state = params["code"], params["state"]
    GithubApi.get_oauth(user_access_url(host: 'zero-no-kaga.moe'), code, state)
  end

  def user_access
    user_data = GithubApi.user_access(params["access_token"])
    Rails.logger.info user_data
  end
end
