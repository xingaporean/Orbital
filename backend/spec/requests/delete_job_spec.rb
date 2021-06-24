require 'rails_helper'

describe "delete job route" do
  before(:each) do
    @job_one = create(:random_job)
    @job_two = create(:random_job)
  end

  it 'should delete the job' do  
    get "/api/v1/jobs"
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)).to eq([YAML.load(@job_one.to_json),YAML.load(@job_two.to_json),])
    delete "/api/v1/jobs/#{@job_one.id}"
      expect(response.status).to eq(204)
    get "/api/v1/jobs"
      expect(JSON.parse(response.body)).to eq([YAML.load(@job_two.to_json)])
  end
end