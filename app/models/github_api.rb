require "net/https"

class GithubApi
  def initialize(client_id, client_secret)
    @client_id = client_id
    @client_secret = client_secret
  end


  class << self
    def get_oauth_authorize(redirect_uri, scope='user', allow_signup=true)
      params = {
        client_id: @client_id,
        redirect_uri: redirect_uri,
        scope: scope,
        state: ,
        allow_signup: allow_signup
      }

      uri = URI("https://github.com/login/oauth/authorize")
      uri.query = URI.encode_www_form(params)
      res = Net::HTTP.get_response(uri)
    end

    def get_oauth_access_token(code)
      params = {
        client_id: @client_id,
        client_secret: @client_secret,
        code: code,
        redirect_uri: redirect_uri
        state: state
      }
      uri = URI("https://github.com/login/oauth/access_token")
    end

    def user_access(access_token)
      uri = URI("https://api.github.com/user")
    end
  end
end