class Zero::DashboardController < ZeroController

  # GET /comments
  # GET /comments.json
  def index
    @categories = Category.all_to_json
  end

end
