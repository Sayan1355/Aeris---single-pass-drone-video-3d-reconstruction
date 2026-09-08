import React, { useState, useMemo } from 'react';
import type { MissionRecord, MissionStatus } from './types';
import { INITIAL_MOCK_MISSIONS } from './data/mockMissions';
import { MissionHeader } from './components/MissionHeader';
import { MissionSummaryStrip } from './components/MissionSummaryStrip';
import { ActiveMissionFeaturedPanel } from './components/ActiveMissionFeaturedPanel';
import { MissionIngestionPipelineStrip } from './components/MissionIngestionPipelineStrip';
import { MissionFilterBar } from './components/MissionFilterBar';
import { MissionListTable } from './components/MissionListTable';
import { MissionInspector } from './components/MissionInspector';
import { MissionAnalyticsSection } from './components/MissionAnalyticsSection';
import { EmptyMissionsState } from './components/EmptyMissionsState';
import { NewMissionModal } from './components/NewMissionModal';

export const MissionsPage: React.FC = () => {
  const [missions, setMissions] = useState<MissionRecord[]>(INITIAL_MOCK_MISSIONS);
  const [selectedMission, setSelectedMission] = useState<MissionRecord | null>(
    INITIAL_MOCK_MISSIONS[0]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<MissionStatus | 'ALL'>('ALL');
  const [platformFilter, setPlatformFilter] = useState('ALL');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Active / featured processing mission
  const activeMission = useMemo(() => {
    return missions.find((m) => m.status === 'PROCESSING' || m.status === 'ACTIVE') || missions[0];
  }, [missions]);

  // Local filtered mission list
  const filteredMissions = useMemo(() => {
    return missions.filter((m) => {
      // Search match
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        m.id.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.platform.toLowerCase().includes(q);

      // Status match
      const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;

      // Platform match
      const matchesPlatform = platformFilter === 'ALL' || m.platform === platformFilter;

      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [missions, searchQuery, statusFilter, platformFilter]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setPlatformFilter('ALL');
  };

  const handleCreateMission = (newMission: MissionRecord) => {
    setMissions((prev) => [newMission, ...prev]);
    setSelectedMission(newMission);
  };

  return (
    <div className="w-full min-h-screen bg-[#07090E] text-[#F8FAFC] flex flex-col font-sans">
      {/* 1. Header Bar */}
      <MissionHeader
        onNewMission={() => setIsNewModalOpen(true)}
        onImportMission={() => setIsNewModalOpen(true)}
      />

      {/* 2. Summary KPI Strip */}
      <MissionSummaryStrip missions={missions} />

      {/* 3. Featured Active Processing Mission Panel */}
      {activeMission && <ActiveMissionFeaturedPanel mission={activeMission} />}

      {/* 4. Ingestion Pipeline Stage Indicator */}
      <MissionIngestionPipelineStrip currentStageIndex={5} />

      {/* 5. Filter & Search Bar */}
      <MissionFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        platformFilter={platformFilter}
        onPlatformChange={setPlatformFilter}
        onClearFilters={handleClearFilters}
      />

      {/* 6. Main Content Area (Table + Side Inspector) */}
      <div className="flex-1 px-6 flex flex-col lg:flex-row items-start gap-4">
        {/* Mission Table or Empty State */}
        <div className="flex-1 w-full overflow-hidden">
          {filteredMissions.length > 0 ? (
            <MissionListTable
              missions={filteredMissions}
              selectedMissionId={selectedMission?.id || null}
              onSelectMission={(m) => setSelectedMission(m)}
            />
          ) : (
            <EmptyMissionsState onClearFilters={handleClearFilters} />
          )}
        </div>

        {/* Right-Side Mission Detail Inspector */}
        {selectedMission && (
          <MissionInspector
            mission={selectedMission}
            onClose={() => setSelectedMission(null)}
          />
        )}
      </div>

      {/* 7. Lower Mission Analytics Section */}
      <MissionAnalyticsSection />

      {/* 8. New Mission Creation Modal */}
      <NewMissionModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreateMission={handleCreateMission}
      />
    </div>
  );
};

export default MissionsPage;
