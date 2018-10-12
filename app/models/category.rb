class Category < ActiveRecord::Base
  validates_presence_of :name
  has_many :blogs
  has_one_attached :cover
end
