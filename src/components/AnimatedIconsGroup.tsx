import React, { useMemo } from 'react';
import { BrainCircuit, Zap, Shield, Users, Mail, BarChart, Calendar, Sparkles, Star, Lightbulb, Cpu, MessageSquare } from 'lucide-react';
import AnimatedFloatingIcon, { AnimatedFloatingIconProps } from './AnimatedFloatingIcon';
import { useAnimationPreference } from '../hooks/useAnimationPreference';

interface AnimatedIconsGroupProps {
  iconCount?: number;
  section?: 'hero' | 'features' | 'ai' | 'pricing' | 'random';
  density?: 'low' | 'medium' | 'high';
  animations?: ('bounce' | 'pulse' | 'rotate' | 'orbit' | 'random')[];
  containerClassName?: string;
}

const AnimatedIconsGroup: React.FC<AnimatedIconsGroupProps> = ({
  iconCount = 5,
  section = 'random',
  density = 'medium',
  animations = ['bounce', 'pulse', 'rotate'],
  containerClassName = ''
}) => {
  // Get animation preference
  const { animationsEnabled } = useAnimationPreference();

  // If animations are disabled, don't render anything
  if (!animationsEnabled) {
    return null;
  }

  // Get icons based on section
  const getSectionIcons = () => {
    switch (section) {
      case 'hero':
        return [
          <Zap size={20} />, 
          <Star size={18} />, 
          <BrainCircuit size={22} />, 
          <Sparkles size={16} />
        ];
      case 'features':
        return [
          <BarChart size={18} />, 
          <MessageSquare size={16} />, 
          <Users size={20} />, 
          <Mail size={18} />
        ];
      case 'ai':
        return [
          <BrainCircuit size={22} />, 
          <Cpu size={20} />, 
          <Lightbulb size={18} />, 
          <Sparkles size={16} />
        ];
      case 'pricing':
        return [
          <Shield size={18} />, 
          <Calendar size={16} />, 
          <Zap size={20} />, 
          <Star size={18} />
        ];
      default:
        return [
          <Zap size={20} />, 
          <BrainCircuit size={22} />, 
          <Star size={18} />, 
          <Sparkles size={16} />, 
          <MessageSquare size={18} />, 
          <Lightbulb size={16} />, 
          <Users size={20} />
        ];
    }
  };
  
  // Colors based on section
  const getSectionColors = () => {
    switch (section) {
      case 'hero':
        return ['text-blue-400', 'text-purple-400', 'text-green-400', 'text-amber-400'];
      case 'features':
        return ['text-green-400', 'text-blue-400', 'text-amber-400', 'text-purple-400'];
      case 'ai':
        return ['text-purple-400', 'text-blue-400', 'text-amber-400', 'text-green-400'];
      case 'pricing':
        return ['text-blue-400', 'text-green-400', 'text-purple-400', 'text-amber-400'];
      default:
        return ['text-blue-400', 'text-purple-400', 'text-green-400', 'text-amber-400'];
    }
  };
  
  // Generate random position based on density
  const getRandomPosition = () => {
    const getRandomValue = (min: number, max: number) => `${Math.floor(min + Math.random() * (max - min))}%`;
    
    const densitySettings = {
      low: { top: [5, 80], right: [5, 80], bottom: [5, 80], left: [5, 80] },
      medium: { top: [5, 90], right: [5, 90], bottom: [5, 90], left: [5, 90] },
      high: { top: [2, 95], right: [2, 95], bottom: [2, 95], left: [2, 95] }
    };
    
    const settings = densitySettings[density];
    
    // Choose two random sides for positioning (e.g., top+left, top+right, etc.)
    const positionSides = ['top', 'right', 'bottom', 'left']
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
      
    const position: AnimatedFloatingIconProps['position'] = {};
    
    positionSides.forEach(side => {
      position[side] = getRandomValue(settings[side][0], settings[side][1]);
    });
    
    return position;
  };
  
  // Create memoized icons to prevent recreating on every render
  const icons = useMemo(() => {
    const sectionIcons = getSectionIcons();
    const sectionColors = getSectionColors();
    const iconProps: AnimatedFloatingIconProps[] = [];

    for (let i = 0; i < iconCount; i++) {
      const icon = sectionIcons[i % sectionIcons.length];
      const color = sectionColors[i % sectionColors.length];
      const animation = animations[i % animations.length];
      const size = ['small', 'medium', 'small'][i % 3] as 'small' | 'medium' | 'large';
      const position = getRandomPosition();
      const delay = i * 0.5; // stagger animations
      const glow = Math.random() > 0.5; // 50% chance of having glow

      iconProps.push({
        icon,
        color,
        animation,
        size,
        position,
        delay,
        duration: 3 + Math.random() * 3, // 3-6 seconds
        glow,
        opacity: 0.6 + Math.random() * 0.3 // 0.6-0.9
      });
    }

    return iconProps;
  }, [iconCount, section, density, JSON.stringify(animations)]);
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${containerClassName}`}>
      {icons.map((props, index) => (
        <AnimatedFloatingIcon key={index} {...props} />
      ))}
    </div>
  );
};

export default AnimatedIconsGroup;