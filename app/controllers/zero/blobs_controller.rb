class Zero::BlobsController < ZeroController
    
  # DELETE /blobs/1.json
    def destroy
      @blob = ActiveStorage::Blob.find_signed!(params[:signed_id])
      if @blob.purge
        render json: {msg: 'delete success', status: :ok}
      else
        render json: {msg: 'err', status: :bad_request}
      end
    end
  
  end
  