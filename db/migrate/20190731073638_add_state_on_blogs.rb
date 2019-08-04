class AddStateOnBlogs < ActiveRecord::Migration[5.2]
  def change
    unless column_exists? :blogs, :state
      add_column :blogs, :state, :string, default: :new
    end
  end
end
