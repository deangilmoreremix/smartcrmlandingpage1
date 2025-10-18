import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Play, Clock } from 'lucide-react';

interface SearchResult {
  text: string;
  timestamp?: string;
  context: string;
  index: number;
}

interface WebinarSearchTranscriptProps {
  transcript: string;
  onTimestampClick?: (timestamp: string) => void;
  className?: string;
}

const WebinarSearchTranscript: React.FC<WebinarSearchTranscriptProps> = ({
  transcript,
  onTimestampClick,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<number | null>(null);
  
  // Extract timestamps and text from transcript
  const transcriptSegments = useMemo(() => {
    if (!transcript) return [];
    
    // Match pattern like [00:12:34] followed by speaker and text
    const timestampRegex = /\[(\d{2}:\d{2}:\d{2})\]\s*([^:]+):\s*(.+?)(?=\[\d{2}:\d{2}:\d{2}\]|$)/gs;
    const segments = [];
    let match;
    
    while ((match = timestampRegex.exec(transcript)) !== null) {
      segments.push({
        timestamp: match[1],
        speaker: match[2].trim(),
        text: match[3].trim(),
        fullText: match[0]
      });
    }
    
    return segments;
  }, [transcript]);
  
  // Search through transcript
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];
    
    transcriptSegments.forEach((segment, index) => {
      const text = segment.text.toLowerCase();
      const speaker = segment.speaker.toLowerCase();
      
      // Check if query matches text or speaker
      if (text.includes(query) || speaker.includes(query)) {
        // Find the position of the match in the text
        const matchIndex = text.indexOf(query);
        let context = segment.text;
        
        // Create context around the match (50 chars before and after)
        if (matchIndex > 50) {
          context = '...' + segment.text.substring(matchIndex - 50);
        }
        if (context.length > 150) {
          context = context.substring(0, 150) + '...';
        }
        
        results.push({
          text: segment.text,
          timestamp: segment.timestamp,
          context: context,
          index: index
        });
      }
    });
    
    return results;
  }, [searchQuery, transcriptSegments]);
  
  const highlightSearchTerm = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-blue-500/30 text-blue-200">$1</mark>');
  };
  
  const handleTimestampClick = (timestamp: string) => {
    if (onTimestampClick) {
      onTimestampClick(timestamp);
    }
  };
  
  return (
    <div className={`bg-white/5 backdrop-blur-md rounded-xl border border-white/10 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Search className="text-blue-400 mr-2" size={20} />
            Searchable Transcript
          </h3>
        </div>
        
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-white/50" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcript..."
            className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-white/50 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Search Results</h4>
              <span className="text-white/60 text-sm">{searchResults.length} results</span>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {searchResults.map((result, idx) => (
                  <motion.div
                    key={idx}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedResult === idx 
                        ? 'bg-blue-500/20 border-blue-500/40' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => {
                      setSelectedResult(idx);
                      if (result.timestamp) {
                        handleTimestampClick(result.timestamp);
                      }
                    }}
                    whileHover={{ x: 3 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <div 
                          className="text-white/80 text-sm"
                          dangerouslySetInnerHTML={{ 
                            __html: highlightSearchTerm(result.context, searchQuery) 
                          }}
                        />
                      </div>
                      
                      {result.timestamp && (
                        <motion.button
                          className="ml-3 flex items-center px-2 py-1 bg-blue-500/20 rounded text-blue-400 text-xs hover:bg-blue-500/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play size={10} className="mr-1" />
                          {result.timestamp}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-white/60">
                <Search size={32} className="mx-auto mb-2 opacity-50" />
                <p>No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
        
        {/* Full Transcript Display */}
        <div className="bg-white/5 rounded-lg p-4 max-h-96 overflow-y-auto">
          <h4 className="text-white font-medium mb-3">Full Transcript</h4>
          
          {transcriptSegments.length > 0 ? (
            <div className="space-y-4">
              {transcriptSegments.map((segment, idx) => (
                <motion.div 
                  key={idx}
                  className="group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.02 }}
                >
                  <div className="flex items-start">
                    {segment.timestamp && (
                      <motion.button
                        className="flex items-center px-2 py-1 bg-white/10 rounded text-white/60 text-xs mr-3 hover:bg-blue-500/20 hover:text-blue-400 flex-shrink-0"
                        onClick={() => handleTimestampClick(segment.timestamp)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Clock size={10} className="mr-1" />
                        {segment.timestamp}
                      </motion.button>
                    )}
                    
                    <div>
                      <span className="text-blue-400 font-medium text-sm">{segment.speaker}:</span>
                      <div 
                        className="text-white/80 text-sm mt-1"
                        dangerouslySetInnerHTML={{ 
                          __html: searchQuery 
                            ? highlightSearchTerm(segment.text, searchQuery)
                            : segment.text 
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-white/60">
              <FileText size={32} className="mx-auto mb-2 opacity-50" />
              <p>No transcript available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebinarSearchTranscript;