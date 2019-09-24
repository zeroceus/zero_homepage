class AddBlogIdOnComments < ActiveRecord::Migration[5.2]
  def change
    unless column_exists? :comments, :blog_id
      add_column :comments, :blog_id, :integer
    end
  end
end
