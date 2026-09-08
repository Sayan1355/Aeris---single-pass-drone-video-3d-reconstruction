import React, { useState, useMemo } from 'react';
import { HistoryHeader } from './components/HistoryHeader';
import { HistoryStatsSummary } from './components/HistoryStatsSummary';
import { FeaturedMissionHero } from './components/FeaturedMissionHero';
import { HistoryQualityTrendChart } from './components/HistoryQualityTrendChart';
import { HistoryFilterBar } from './components/HistoryFilterBar';
import { MissionArchiveTable } from './components/MissionArchiveTable';
import { MissionDetailInspector } from './components/MissionDetailInspector';
import { MOCK_MISSION_RECORDS, MOCK_HISTORY_SUMMARY, MOCK_QUALITY_TREND } from './data/mockHistory';
import type { HistoryFilterState, MissionArchiveRecord } from './types';

const INITIAL_FILTER: HistoryFilterState = {
  searchQuery: '',
  statusFilter: 'ALL',
  typeFilter: 'ALL',
  dateFilter: 'ALL',
  qualityFilter: 'ALL',
};

export const MissionHistoryPage: React.FC = () => {
  const [filter, setFilter] = useState<HistoryFilterState>(INITIAL_FILTER);
  const [selectedMission, setSelectedMission] = useState<MissionArchiveRecord | null>(null);

  // Latest completed mission for the Hero Banner
  const featuredMission = useMemo(() => {
    return MOCK_MISSION_RECORDS.find((m) => m.isFeatured) || MOCK_MISSION_RECORDS[0];
  }, []);

  // Filter logic
  const filteredMissions = useMemo(() => {
    return MOCK_MISSION_RECORDS.filter((mission) => {
      // 1. Search Query
      if (filter.searchQuery.trim() !== '') {
        const query = filter.searchQuery.toLowerCase();
        const matchesQuery =
          mission.id.toLowerCase().includes(query) ||
          mission.siteName.toLowerCase().includes(query) ||
          mission.locationCoordinates.toLowerCase().includes(query) ||
          mission.crs.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // 2. Status
      if (filter.statusFilter !== 'ALL' && mission.status !== filter.statusFilter) {
        return false;
      }

      // 3. Mission Type
      if (filter.typeFilter !== 'ALL' && mission.missionType !== filter.typeFilter) {
        return false;
      }

      // 4. Quality Threshold
      if (filter.qualityFilter !== 'ALL') {
        const minVal = parseInt(filter.qualityFilter, 10);
        if (mission.qualityScore < minVal) return false;
      }

      return true;
    });
  }, [filter]);

  const handleFilterChange = (newFilter: Partial<HistoryFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleResetFilters = () => {
    setFilter(INITIAL_FILTER);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-[#F8FAFC] p-6 space-y-6">
      {/* Top Header */}
      <HistoryHeader summary={MOCK_HISTORY_SUMMARY} />

      {/* Aggregate Statistics */}
      <HistoryStatsSummary summary={MOCK_HISTORY_SUMMARY} />

      {/* Featured Spotlight Mission */}
      {featuredMission && (
        <FeaturedMissionHero
          mission={featuredMission}
          onSelect={(mission) => setSelectedMission(mission)}
        />
      )}

      {/* Recharts Historical Quality Trend Line */}
      <HistoryQualityTrendChart data={MOCK_QUALITY_TREND} />

      {/* Filter Bar */}
      <HistoryFilterBar
        filter={filter}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        totalCount={MOCK_MISSION_RECORDS.length}
        filteredCount={filteredMissions.length}
      />

      {/* Layout Grid: Table + Optional Inspector Drawer */}
      <div className={`grid grid-cols-1 ${selectedMission ? 'lg:grid-cols-3' : 'grid-cols-1'} gap-6 transition-all`}>
        <div className={selectedMission ? 'lg:col-span-2' : 'col-span-1'}>
          <MissionArchiveTable
            missions={filteredMissions}
            selectedMissionId={selectedMission?.id || null}
            onSelectMission={(mission) => setSelectedMission(mission)}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Selected Mission Inspector Side Drawer */}
        {selectedMission && (
          <div className="lg:col-span-1 sticky top-6 self-start max-h-[85vh]">
            <MissionDetailInspector
              mission={selectedMission}
              onClose={() => setSelectedMission(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionHistoryPage;
