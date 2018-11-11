class Blog < ActiveRecord::Base
  belongs_to :category
  validates_presence_of :title, :content
  has_many_attached :images
  has_many :comments
  paginates_per 8

end
