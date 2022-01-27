class Zero::CommentsController < ZeroController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  # GET /comments
  # GET /comments.json
  def index
    @comments = Comment.page(params[:page])
    respond_to do |format|
      format.html { render :index, notice: 'Comment was successfully destroyed.' }
      format.json { render json: {comments: @comments}, status: :ok }
    end
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment.destroy
    respond_to do |format|
      format.html { redirect_to comments_url, notice: 'Comment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.fetch(:comment, {})
    end
end
