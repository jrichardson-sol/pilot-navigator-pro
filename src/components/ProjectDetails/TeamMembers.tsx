import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, X } from "lucide-react";

interface TeamMember {
  name: string;
  email: string;
  role?: string;
}

interface TeamMembersProps {
  teamSize: number;
  isEditing: boolean;
  editedData: {
    teamSize: number;
    teamMembers: TeamMember[];
  };
  setEditedData: (data: any) => void;
}

export const TeamMembers = ({ teamSize, isEditing, editedData, setEditedData }: TeamMembersProps) => {
  const { toast } = useToast();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState<TeamMember>({ name: "", email: "", role: "" });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Error",
        description: "Please fill in both name and email",
        variant: "destructive",
      });
      return;
    }

    setEditedData({
      ...editedData,
      teamMembers: [...(editedData.teamMembers || []), newMember],
      teamSize: (editedData.teamMembers?.length || 0) + 1,
    });

    setNewMember({ name: "", email: "", role: "" });
    setIsAddingMember(false);
    
    toast({
      title: "Success",
      description: "Team member added successfully!",
    });
  };

  const removeMember = (index: number) => {
    const updatedMembers = [...(editedData.teamMembers || [])];
    updatedMembers.splice(index, 1);
    setEditedData({
      ...editedData,
      teamMembers: updatedMembers,
      teamSize: updatedMembers.length,
    });
    
    toast({
      title: "Success",
      description: "Team member removed successfully!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{editedData.teamSize || teamSize} Members</span>
            <Users className="h-4 w-4" />
          </div>
          
          {isEditing && (
            <Button 
              onClick={() => setIsAddingMember(true)}
              variant="outline"
              size="sm"
              className="w-full mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          )}

          {editedData.teamMembers?.map((member: TeamMember, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
                {member.role && <p className="text-sm text-gray-500">{member.role}</p>}
              </div>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMember(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="Enter email"
                  type="email"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Role (Optional)</label>
                <Input
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  placeholder="Enter role"
                />
              </div>
              <Button onClick={handleAddMember} className="w-full">
                Add Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};