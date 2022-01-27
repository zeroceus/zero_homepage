class Comment < ActiveRecord::Base
  belongs_to :blog
  belongs_to :user
  validates_presence_of :content
  
end
