class Zero::SessionsController < ApplicationController

  def new
  end

  def create
    if authenticate
      session[:is_login] = true 
      redirect_to zero_root_path
    else
      flash[:danger] = 'Invalid name or password'
      redirect_to new_zero_session_path
    end
  end

  def destroy
    session[:is_login] = nil
    redirect_to new_zero_session_path
  end

  private
    def session_params
      params.permit(:name, :password)
    end

    def authenticate
      return session_params[:name] == ZERO_NAME && session_params[:password] == ZERO_SECRET
    end
end