class Job < ApplicationRecord
  belongs_to :user, optional: false
  validates_presence_of :identifier
  validates_presence_of :organisation_name
  validates_presence_of :description
  validates_presence_of :location
  validates_presence_of :start_date
  validates_presence_of :end_date
  validates_inclusion_of :approved, in: [true, false]
end
