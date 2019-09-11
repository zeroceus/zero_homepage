class ChangeBlogState < ActiveRecord::Migration[5.2]
  def change
    Blog.where(state: :draft).update_all(state: :drafted)
  end
end
