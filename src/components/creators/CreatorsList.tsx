
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Creator = {
  name: string;
  country: string;
  images: string[];
};

interface CreatorsListProps {
  creators: Creator[];
  onCreatorClick: (creator: Creator) => void;
}

const CreatorsList = ({ creators, onCreatorClick }: CreatorsListProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom du styliste</TableHead>
            <TableHead>Pays</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creators.map((creator, index) => (
            <TableRow 
              key={index} 
              className={creator.images.length > 0 ? "cursor-pointer hover:bg-gray-100" : ""}
              onClick={() => creator.images.length > 0 && onCreatorClick(creator)}
            >
              <TableCell className="font-medium">
                {creator.name}
                {creator.images.length > 0 && (
                  <span className="ml-2 text-xs text-gray-500">(Cliquez pour voir les photos)</span>
                )}
              </TableCell>
              <TableCell>{creator.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CreatorsList;
