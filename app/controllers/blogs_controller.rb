class BlogsController < ApplicationController
  before_action :set_blog, only: [:show]
  # before_action :base_data, only: [:show]

  # GET /blogs
  # GET /blogs.json
  def index
    if params[:category_id].present?
      # @blogs = Blog.submitted.where(category_id: params[:category_id]).page(params[:page])
      @blogs = Blog.where(category_id: params[:category_id]).page params[:page]
    else
      # @blogs = Blog.submitted.order(id: :desc).page params[:page]
      @blogs = Blog.order(id: :desc).page params[:page]
    end

    @params = {
      page_count:  @blogs.page(1).total_pages,
      blog_count: Blog.count
    }
    @blogs = @blogs.map(&:to_json)
    @categories = Category.all_to_json

    respond_to do |format|
      format.json { render json: { blogs: @blogs, categories: @categories, params: @params }, status: :ok}
      format.html { render :index }
    end
    # render :file => "#{Rails.root}/public/404", :layout => false, :status => :not_found
  end

  # GET /blogs/1
  # GET /blogs/1.json
  def show
    @categories = Category.all_to_json
    @params = {
      blog_count: Blog.count,
      oauth_url: @oauth_url
    }
    respond_to do |format|
      format.json { render :show }
      format.html { render :show }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_blog
      @blog = Blog.find(params[:id])
    end

    def base_data
      @oauth_url = GithubApi.get_oauth_authorize_url(request.url)
      Rails.logger.info @oauth_url
    end
end
