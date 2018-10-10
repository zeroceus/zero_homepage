class ZeroController < ApplicationController
  before_action :check_authentication
  layout 'zero'
  private
    def check_authentication
      unless session[:is_login]
        flash[:danger] = 'Login First'
        redirect_to new_zero_session_path
      end
    end
end