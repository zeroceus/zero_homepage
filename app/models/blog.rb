class Blog < ActiveRecord::Base
  belongs_to :category
  validates_presence_of :title, :content
  has_many_attached :images
  paginates_per 8

end
