class Blog < ActiveRecord::Base
  belongs_to :category
  validates_presence_of :title, :content

  def abstract
  end
end
