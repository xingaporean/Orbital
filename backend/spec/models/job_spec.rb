require 'rails_helper'

RSpec.describe Job, :type => :model do

  before(:all) do
    @user = create(:user)
  end

  subject {
    described_class.new(identifier: "Test_Identifier", 
                        organisation_name: "Test_Org_Name", 
                        description: "Test_Description",
                        location: "Test_Location", 
                        start_date: Date.current, 
                        end_date: Date.current + 1.week, 
                        approved: false,
                        user_id: @user.id)
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without an identifier" do
    subject.identifier = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an organisation_name" do
    subject.organisation_name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a description" do
    subject.description = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a location" do
    subject.location = nil
    expect(subject).to_not be_valid
  end
  
  it "is not valid without a start_date" do
    subject.start_date = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a end_date" do
    subject.end_date = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without approved" do
    subject.approved = nil
    expect(subject).to_not be_valid
  end

  describe "Associations" do
    it { should belong_to(:user).without_validating_presence }
  end
end