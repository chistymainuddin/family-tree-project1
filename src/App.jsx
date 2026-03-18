import React, { use, Suspense, useState, Component } from 'react';
import * as OrgModule from '@dabeng/react-orgchart';
import ProfileCard from './components/ProfileCard';
import AddMemberForm from './components/AddMemberForm';
import './App.css';

const OrganizationChart = OrgModule.default?.default || OrgModule.default || OrgModule;

const transformToTree = (list) => {
  if (!list || list.length === 0) return [];
  const map = {};
  const roots = [];
  
  list.forEach((item) => {
    map[item.id] = { 
      ...item, 
      name: item.name || 'Unnamed Member', 
      // Update title to show custom generation label
      title: `${item.generation}${item.spouse ? ` | Spouse: ${item.spouse}` : ''}`,
      children: [] 
    };
  });

  list.forEach((node) => {
    if (node.parent_id && map[node.parent_id]) {
      map[node.parent_id].children.push(map[node.id]);
    } else {
      roots.push(map[node.id]);
    }
  });
  return roots;
};

// ... Rest of component logic remains same
