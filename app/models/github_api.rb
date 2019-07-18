require "net/https"
require 'securerandom'

class GithubApi

  class << self
    def get_oauth_authorize_url(redirect_uri, scope='user', allow_signup=true)
      params = {
        client_id: GithubSetting.client_id,
        redirect_uri: redirect_uri,
        scope: scope,
        state: SecureRandom.hex(10),
        allow_signup: allow_signup
      }

      uri = URI("https://github.com/login/oauth/authorize")
      uri.query = URI.encode_www_form(params)
      uri.to_s
    end

    def get_oauth_access_token(redirect_uri, code)
      params = {
        client_id: GithubSetting.client_id,
        client_secret: GithubSetting.client_secret,
        code: code,
        redirect_uri: redirect_uri,
        state: state
      }
      uri = URI("https://github.com/login/oauth/access_token")
    end

    def user_access(access_token)
      uri = URI("https://api.github.com/user")
      req = Net::HTTP::Get.new(uri.path)
      req["Authorization"] = "#{access_token} OAUTH-TOKEN"
      res = Net::HTTP.start(uri.host, uri.port) {|http|
        http.request(req)
      }
      Rails.logger.debug res
    end
  end
end