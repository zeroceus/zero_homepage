class CommentsController < ApplicationController

  # GET /comments
  # GET /comments.json
  def index
    @comments = Comment.all
  end

  # POST /comments
  # POST /comments.json
  def create
    if @current_user.present?
      @comment = Comment.new(comment_params.merge!(user: @current_user))
      respond_to do |format|
        if @comment.save
          format.html { redirect_to request.referer, notice: 'Comment was successfully created.' }
          format.json { render :show, status: :created, location: @comment }
        else
          format.html { render :new }
          format.json { render json: @comment.errors, status: :unprocessable_entity }
        end
      end
    else
      redirect_to request.referer, alert: 'Login first!'
    end
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit(:content, :blog_id)
    end
end
