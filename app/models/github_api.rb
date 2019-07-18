require "net/https"
require 'securerandom'

class GithubApi

  class << self
    def get_oauth_authorize_url(redirect_uri, scope='public_repo', allow_signup=true)
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

    def get_oauth(code, state)
      params = {
        client_id: GithubSetting.client_id,
        client_secret: GithubSetting.client_secret,
        code: code,
        state: state
      }
      uri = URI("https://github.com/login/oauth/access_token")
      header = {'Content-Type': 'application/json', 'Accpet': 'application/json'}
      http = Net::HTTP.new(uri.host, uri.port)
      req = Net::HTTP::Post.new(uri.path, header)
      req.body = params.to_json
      http.use_ssl = true
      res = http.request(req).body
    end

    def user_access(access_token)
      uri = URI("https://api.github.com/user")
      req = Net::HTTP::Get.new(uri.path)
      req["Authorization"] = "#{access_token} OAUTH-TOKEN"
      res = Net::HTTP.start(uri.host, uri.port) {|http|
        http.request(req)
      }
    end
  end
end