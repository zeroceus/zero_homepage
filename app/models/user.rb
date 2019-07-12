class User < ActiveRecord::Base
  has_many :comments
  has_one_attached :avatar
end
