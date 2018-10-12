class AddIndexToBlog < ActiveRecord::Migration[5.2]
  def change
    unless index_exists? :blogs, :category_id
      add_index :blogs, :category_id
    end
  end
end
