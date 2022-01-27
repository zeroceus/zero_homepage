class Zero::BlogsController < ZeroController
  before_action :set_blog, only: [:show, :edit, :update, :destroy, :submit]
  # GET /blogs
  # GET /blogs.json
  def index
    if params[:category_id].present?
      @blogs = Blog.where(category_id: params[:category_id]).page(params[:page])
    else
      @blogs = Blog.page params[:page]
    end
    
    @blogs = @blogs.map(&:to_json)

    respond_to do |format|
      format.html { render :index }
      format.json { render json: {blogs: @blogs}, status: :ok}
    end
  end

  # GET /blogs/1
  # GET /blogs/1.json
  def show
  end

  # GET /blogs/new
  def new
    @blog = Blog.new
    @categories = Category.all.map{|category| [category.name, category.id]}
  end

  # GET /blogs/1/edit
  def edit
    @categories = Category.all.map{|category| [category.name, category.id]}
  end

  # POST /blogs
  # POST /blogs.json
  def create
    @blog = Blog.new(blog_params)
    respond_to do |format|
      if @blog.save
        format.json { render json: {msg: 'success'}, status: :ok}
        format.html { redirect_to zero_blogs_path(@blog), notice: 'Blog was successfully created.' }
      else
        format.json { render json: {msg: @blog.errors.messages}, status: :bad_request}
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /blogs/1
  # PATCH/PUT /blogs/1.json
  def update
    respond_to do |format|
      if @blog.update(blog_params)
        format.json { render json: {msg: 'success'}, status: :ok}
        format.html { redirect_to zero_blogs_path(@blog), notice: 'Blog was successfully updated.' }
      else
        format.json { render json: {msg: @blog.errors.messages}, status: :bad_request}
        format.html { render :edit }
      end
    end
  end

  # DELETE /blogs/1
  # DELETE /blogs/1.json
  def destroy
    if @blog.destroy!
      respond_to do |format|
        format.html { redirect_to zero_blogs_path, notice: 'Blog was successfully destroyed.' }
        format.json { render json: {msg: 'success'}, status: :ok }
      end
    else
      respond_to do |format|
        format.html { redirect_to zero_blogs_path, notice: 'Destroyed fail.' }
        format.json { render json: {msg: 'fail'}, status: :bad_request }
      end
    end
  end

  def submit
    if @blog.submit!
      respond_to do |format|
        format.html { redirect_to zero_blogs_path, notice: 'Blog was successfully submmitted.' }
        format.json { render json: {blog: @blog.to_json}, status: :ok}
      end
    else
      respond_to do |format|
        format.html { redirect_to zero_blogs_path, notice: 'Blog was successfully submmitted.' }
        format.json { render json: {msg: @blog.errors.messages}, status: :bad_request}
      end
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
