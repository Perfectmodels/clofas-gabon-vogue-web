
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Camera } from 'lucide-react';

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
            <TableHead className="w-16 text-center">Photos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creators.map((creator, index) => (
            <TableRow 
              key={index} 
              className={creator.images.length > 0 ? "cursor-pointer hover:bg-gray-100" : ""}
              onClick={() => creator.images.length > 0 && onCreatorClick(creator)}
            >
              <TableCell className="font-medium">{creator.name}</TableCell>
              <TableCell>{creator.country}</TableCell>
              <TableCell className="text-center">
                {creator.images.length > 0 ? (
                  <div className="flex justify-center items-center">
                    <Camera className="h-5 w-5 text-clofas-coral" />
                    <span className="ml-1 text-xs">{creator.images.length}</span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CreatorsList;
