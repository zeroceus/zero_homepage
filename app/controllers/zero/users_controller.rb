class Zero::UsersController < ZeroController

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

end
