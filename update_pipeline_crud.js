const fs = require('fs');
const path = 'src/app/dashboard/pipeline/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Dialog imports if missing
if (!content.includes('import { Dialog')) {
  content = content.replace(
    'import { Badge } from "@/components/ui/badge";',
    'import { Badge } from "@/components/ui/badge";\nimport { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";\nimport { Button } from "@/components/ui/button";'
  );
}

// Ensure Edit icon is imported
if (!content.includes('Edit2,')) {
  content = content.replace(
    'Plus,',
    'Plus,\n  Edit2,'
  );
}

// 2. Add new states inside PipelinePage
const stateToAdd = `
  // Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    name: "",
    role: "",
    company: "",
    value: 0,
    stage: "contact" as PipelineStage,
    source: "Email Cold Run"
  });

  const handleEditProspect = (p: Prospect) => {
    setEditingId(p.id);
    setFormData({
      name: p.name,
      role: p.role,
      company: p.company,
      value: p.value,
      stage: p.stage,
      source: p.source
    });
    setIsModalOpen(true);
  };

  const handleSaveProspect = () => {
    if (!formData.name) return;
    
    if (editingId) {
      setProspects(prev => prev.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      const newP: Prospect = {
        ...formData,
        id: String(Date.now()),
      };
      setProspects([...prospects, newP]);
    }
    setIsModalOpen(false);
  };
`;

content = content.replace(
  '  // HTML5 Drag and Drop handlers',
  stateToAdd + '\n  // HTML5 Drag and Drop handlers'
);

// 3. Rewrite handleAddProspect
content = content.replace(
  /const handleAddProspect = \(stage: PipelineStage\) => {[\s\S]*?};/,
  `const handleAddProspect = (stage: PipelineStage) => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      company: "",
      value: 0,
      stage: stage,
      source: "Email Cold Run"
    });
    setIsModalOpen(true);
  };`
);

// 4. Add the Edit Button to the Card (4 places)
// We look for the delete button and insert the edit button right before it.
const editButtonJSX = `
                        <button 
                          onClick={() => handleEditProspect(p)}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 hover:text-blue-400 cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>`;
                        
content = content.replace(
  /<button \s*onClick=\{\(\) => handleDeleteProspect\(p\.id\)\}/g,
  editButtonJSX + '\n                        <button onClick={() => handleDeleteProspect(p.id)}'
);

// 5. Add the Dialog UI at the end of the return statement
const modalJSX = `
      {/* Prospect Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Prospect" : "Add Prospect"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update the details for this prospect." : "Enter details for the new prospect."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input 
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})} 
                  placeholder="e.g. CEO"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input 
                  value={formData.company} 
                  onChange={(e) => setFormData({...formData, company: e.target.value})} 
                  placeholder="e.g. Acme Corp"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Value ($)</label>
                <Input 
                  type="number"
                  value={formData.value || ""} 
                  onChange={(e) => setFormData({...formData, value: parseInt(e.target.value) || 0})} 
                  placeholder="5000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Source / Tag</label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                >
                  <option value="Email Cold Run">Email Cold Run</option>
                  <option value="LinkedIn Connect">LinkedIn Connect</option>
                  <option value="Partner Referral">Partner Referral</option>
                  <option value="Direct Inbound">Direct Inbound</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProspect}>{editingId ? "Save Changes" : "Add Prospect"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}`;

content = content.replace(/    <\/div>\n  \);\n\}/, modalJSX);

fs.writeFileSync(path, content, 'utf8');
console.log('Prospect CRUD functionality added to Pipeline Page.');
