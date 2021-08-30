class Zero::BlogsController < ZeroController
  before_action :set_blog, only: [:show, :edit, :update, :destroy, :delete_image, :submit]
  # GET /blogs
  # GET /blogs.json
  def index
    if params[:category_id].present?
      @blogs = Blog.where(category_id: params[:category_id]).page(params[:page])
    else
      @blogs = Blog.page params[:page]
    end
  end

  # GET /blogs/1
  # GET /blogs/1.json
  def show
  end

  # GET /blogs/new
  def new
    @blog = Blog.new
  end

  # GET /blogs/1/edit
  def edit
  end

  # POST /blogs
  # POST /blogs.json
  def create
    @blog = Blog.new(blog_params)

    respond_to do |format|
      if @blog.save
        format.html { redirect_to zero_blogs_path(@blog), notice: 'Blog was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /blogs/1
  # PATCH/PUT /blogs/1.json
  def update
    respond_to do |format|
      if @blog.update(blog_params)
        format.html { redirect_to zero_blogs_path(@blog), notice: 'Blog was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  # DELETE /blogs/1
  # DELETE /blogs/1.json
  def destroy
    @blog.destroy
    respond_to do |format|
      format.html { redirect_to zero_blogs_path, notice: 'Blog was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def delete_image
    attachment = @blog.images.find(params[:attachment_id])
    if attachment.purge
      respond_to do |format|
        # format.json {}, status: :ok
      end
    end
  end

  def submit
    @blog.submit!
    respond_to do |format|
      format.html { redirect_to zero_blogs_path, notice: 'Blog was successfully submmitted.' }
      format.json { head :no_content }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_blog
      @blog = Blog.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def blog_params
      params.require(:blog).permit(:title, :content, :category_id, :blog_content, :images => [])
    end

end
