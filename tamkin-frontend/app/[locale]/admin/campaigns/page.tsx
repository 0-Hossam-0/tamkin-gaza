import CampaignCreator from '@/components/creators/CampaignCreator';
import CampaignsTable from '@/components/tables/CampaignsTable';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col gap-6">
      <CampaignCreator />
      <CampaignsTable />
    </div>
  )
}

export default page;