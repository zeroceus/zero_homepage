class BlogsController < ApplicationController
  before_action :set_blog, only: [:show, :edit, :update, :destroy]

  # GET /blogs
  # GET /blogs.json
  def index
    # @blogs = Blog.all
    render :file => "#{Rails.root}/public/404", :layout => false, :status => :not_found
  end

  # GET /blogs/1
  # GET /blogs/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_blog
      @blog = Blog.find(params[:id])
    end

end
