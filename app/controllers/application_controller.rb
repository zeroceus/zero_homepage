class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :auth

  def auth
    if session[:login].present?
      @current_user = User.find_by(name: session[:login])
    elsif params["code"] and params["state"]
      code, state = params["code"], params["state"]
      response = GithubApi.get_oauth(code, state)
      access_token = Rack::Utils.parse_query(response)["access_token"]
      user_data = GithubApi.user_access(access_token)
      
      Rails.logger.info user_data

      session[:login] = user_data["login"]
      @current_user = User.find_or_create_by!(name: user_data["login"], avatar_url: user_data["avatar_url"])
    end
  end

end
