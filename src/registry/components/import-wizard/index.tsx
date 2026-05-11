"use client";

import React, { useState, useMemo } from "react";
import { 
  FileUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Table as TableIcon, 
  Settings2, 
  ChevronRight, 
  Search,
  ArrowLeft,
  Loader2,
  Trash2,
  Info,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ImportField, RawRow, targetFields, mockCsvData, ValidationError } from "./schema";

// --- Helper Functions ---

const parseCsv = (csv: string): { headers: string[], rows: RawRow[] } => {
  const lines = csv.split("\n");
  const headers = lines[0].split(",").map(h => h.trim());
  const rows = lines.slice(1).filter(l => l.trim()).map(line => {
    const values = line.split(",").map(v => v.trim());
    const row: RawRow = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    return row;
  });
  return { headers, rows };
};

const validateValue = (value: any, field: ImportField): string | null => {
  if (field.required && (!value || value.toString().trim() === "")) {
    return `${field.label} is required`;
  }
  if (!value) return null;

  switch (field.type) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email format";
    case "number":
      return isNaN(Number(value)) ? "Must be a number" : null;
    case "date":
      return isNaN(Date.parse(value)) ? "Invalid date format" : null;
    default:
      return null;
  }
};

// --- Main Component ---

export function BulkImportDemo() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isUploading, setIsUploading] = useState(false);
  const [csvData, setCsvData] = useState<{ headers: string[], rows: RawRow[] } | null>(null);
  const [mapping, setMapping] = useState<Record<string, string>>({}); // SystemField -> CsvHeader
  const [errors, setErrors] = useState<ValidationError[]>([]);

  // --- Step 1 Handlers ---
  const handleFileUpload = () => {
    setIsUploading(true);
    // Simulate parsing
    setTimeout(() => {
      const data = parseCsv(mockCsvData);
      setCsvData(data);
      
      // Attempt auto-mapping
      const initialMapping: Record<string, string> = {};
      targetFields.forEach(field => {
        const match = data.headers.find(h => 
          h.toLowerCase() === field.label.toLowerCase() || 
          h.toLowerCase() === field.key.toLowerCase()
        );
        if (match) initialMapping[field.key] = match;
      });
      setMapping(initialMapping);
      
      setIsUploading(false);
      setStep(2);
    }, 1500);
  };

  // --- Step 2 Handlers ---
  const handleMappingChange = (systemKey: string, csvHeader: string) => {
    setMapping(prev => ({ ...prev, [systemKey]: csvHeader }));
  };

  const startValidation = () => {
    if (!csvData) return;
    
    const newErrors: ValidationError[] = [];
    csvData.rows.forEach((row, rowIndex) => {
      targetFields.forEach(field => {
        const csvHeader = mapping[field.key];
        const value = csvHeader ? row[csvHeader] : null;
        const error = validateValue(value, field);
        if (error) {
          newErrors.push({ row: rowIndex, field: field.key, message: error });
        }
      });
    });

    setErrors(newErrors);
    setStep(3);
  };

  // --- Step 3 View ---
  const validRowsCount = useMemo(() => {
    if (!csvData) return 0;
    const errorRows = new Set(errors.map(e => e.row));
    return csvData.rows.length - errorRows.size;
  }, [csvData, errors]);

  const handleFinalImport = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setStep(4);
      toast.success("Successfully imported data!");
    }, 2000);
  };

  return (
    <Card className="max-w-5xl mx-auto overflow-hidden shadow-xl border-none">
      {/* Wizard Header */}
      <div className="bg-muted/30 px-8 py-6 border-b">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                 <FileUp className="h-5 w-5" />
              </div>
              <div>
                 <h2 className="text-xl font-bold tracking-tight">Data Import Wizard</h2>
                 <p className="text-sm text-muted-foreground">Upload, map, and validate your data in 4 easy steps.</p>
              </div>
           </div>
           <Badge variant="outline" className="h-6 px-3">CSV / XLSX Support</Badge>
        </div>

        {/* Stepper */}
        <div className="relative flex justify-between">
           <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0" />
           <div 
             className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500" 
             style={{ width: `${((step - 1) / 3) * 100}%` }}
           />
           
           {[
             { s: 1, label: "Upload" },
             { s: 2, label: "Map Columns" },
             { s: 3, label: "Validate" },
             { s: 4, label: "Complete" }
           ].map((item) => (
             <div key={item.s} className="relative z-10 flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  step >= item.s ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-background border-muted text-muted-foreground"
                )}>
                  {step > item.s ? <CheckCircle2 className="h-6 w-6" /> : <span>{item.s}</span>}
                </div>
                <span className={cn(
                  "text-xs font-medium uppercase tracking-wider",
                  step === item.s ? "text-primary" : "text-muted-foreground"
                )}>{item.label}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Wizard Content */}
      <div className="p-8 min-h-[400px]">
        {step === 1 && (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
             <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 group cursor-pointer hover:bg-primary/10 transition-colors border-2 border-dashed border-primary/20">
                <FileUp className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
             </div>
             <h3 className="text-lg font-bold">Select a file to import</h3>
             <p className="text-muted-foreground max-w-sm mt-2 mb-8">
               Upload your CSV or Excel file. We'll help you map the columns to our system fields.
             </p>
             <div className="flex gap-4">
                <Button size="lg" onClick={handleFileUpload} disabled={isUploading} className="min-w-[160px]">
                   {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Choose File"}
                </Button>
                <Button variant="outline" size="lg">Download Template</Button>
             </div>
             <p className="text-[11px] text-muted-foreground mt-8 flex items-center gap-1">
               <Info className="h-3 w-3" />
               Max file size: 10MB. Supports .csv, .xls, .xlsx
             </p>
          </div>
        )}

        {step === 2 && csvData && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
             <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                   <Settings2 className="h-5 w-5 text-primary" />
                   Match Columns
                </h3>
                <p className="text-sm text-muted-foreground">We found {csvData.headers.length} columns in your file.</p>
             </div>
             
             <div className="grid gap-4 border rounded-xl overflow-hidden bg-card">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                   <div className="col-span-5">System Field</div>
                   <div className="col-span-1 flex justify-center"><ArrowRight className="h-4 w-4" /></div>
                   <div className="col-span-6">Your CSV Column</div>
                </div>
                
                <ScrollArea className="h-[300px]">
                   <div className="divide-y">
                      {targetFields.map((field) => (
                        <div key={field.key} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/10 transition-colors">
                           <div className="col-span-5 flex flex-col">
                              <div className="flex items-center gap-2">
                                 <span className="text-sm font-semibold">{field.label}</span>
                                 {field.required && <Badge variant="destructive" className="text-[9px] h-4 px-1">Required</Badge>}
                              </div>
                              {field.description && <span className="text-xs text-muted-foreground mt-0.5">{field.description}</span>}
                           </div>
                           <div className="col-span-1 flex justify-center">
                              <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
                           </div>
                           <div className="col-span-6">
                              <Select 
                                value={mapping[field.key] || "unmapped"} 
                                onValueChange={(val) => handleMappingChange(field.key, val)}
                              >
                                 <SelectTrigger className={cn(
                                   "w-full",
                                   !mapping[field.key] && field.required && "border-destructive/50 bg-destructive/5"
                                 )}>
                                    <SelectValue placeholder="Skip column" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="unmapped" className="text-muted-foreground italic">Skip column</SelectItem>
                                    {csvData.headers.map(header => (
                                      <SelectItem key={header} value={header}>{header}</SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>
                      ))}
                   </div>
                </ScrollArea>
             </div>
          </div>
        )}

        {step === 3 && csvData && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
             <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-lg font-bold">Validation Results</h3>
                   <p className="text-sm text-muted-foreground">Review any errors before finalizing the import.</p>
                </div>
                <div className="flex items-center gap-3">
                   <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-200">
                      {validRowsCount} Valid Rows
                   </Badge>
                   {errors.length > 0 && (
                     <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
                        {errors.length} Issues Found
                     </Badge>
                   )}
                </div>
             </div>

             {errors.length > 0 ? (
               <div className="space-y-4">
                  <Alert variant="destructive" className="bg-destructive/5 border-destructive/20">
                     <AlertCircle className="h-4 w-4" />
                     <AlertTitle>Mapping Issues Detected</AlertTitle>
                     <AlertDescription>
                        We found some formatting issues in your data. You can still import, but rows with errors will be skipped.
                     </AlertDescription>
                  </Alert>

                  <div className="border rounded-xl overflow-hidden">
                     <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/30 text-xs font-bold uppercase tracking-wider">
                        <div className="col-span-1">Row</div>
                        <div className="col-span-4">Field</div>
                        <div className="col-span-7">Issue</div>
                     </div>
                     <ScrollArea className="h-[250px]">
                        <div className="divide-y">
                           {errors.map((error, i) => (
                             <div key={i} className="grid grid-cols-12 gap-4 px-6 py-3 text-sm items-center">
                                <div className="col-span-1 font-mono text-muted-foreground">{error.row + 2}</div>
                                <div className="col-span-4 font-semibold">{targetFields.find(f => f.key === error.field)?.label}</div>
                                <div className="col-span-7 text-destructive flex items-center gap-2">
                                   <AlertCircle className="h-3.5 w-3.5" />
                                   {error.message}
                                </div>
                             </div>
                           ))}
                        </div>
                     </ScrollArea>
                  </div>
               </div>
             ) : (
               <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                     <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold">Everything looks perfect!</h4>
                  <p className="text-muted-foreground max-w-sm mt-1">
                    All rows are valid and ready to be imported into your system.
                  </p>
               </div>
             )}
          </div>
        )}

        {step === 4 && (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
             <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-primary/20 relative">
                <CheckCircle2 className="h-12 w-12 text-primary-foreground animate-in slide-in-from-bottom duration-500" />
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
             </div>
             <h2 className="text-3xl font-extrabold tracking-tight">Import Complete!</h2>
             <p className="text-lg text-muted-foreground mt-2 max-w-md">
               We've successfully processed and imported <b>{validRowsCount}</b> records into your database.
             </p>
             <div className="mt-10 flex gap-4">
                <Button size="lg" onClick={() => setStep(1)}>Import More Data</Button>
                <Button variant="outline" size="lg">View User Directory</Button>
             </div>
          </div>
        )}
      </div>

      {/* Wizard Footer */}
      {step < 4 && (
        <div className="px-8 py-6 border-t bg-muted/10 flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => setStep((step - 1) as any)} 
            disabled={step === 1 || isUploading}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-4">
             {step === 2 && (
               <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                       <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <HelpCircle className="h-4 w-4" />
                       </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                       <p>Auto-mapping matches CSV headers that sound like our field names. Manual adjustments can be made below.</p>
                    </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
             )}
             
             <Button 
               size="lg" 
               className="min-w-[140px]" 
               disabled={isUploading}
               onClick={() => {
                 if (step === 2) startValidation();
                 else if (step === 3) handleFinalImport();
               }}
             >
               {isUploading ? (
                 <Loader2 className="h-4 w-4 animate-spin" />
               ) : (
                 <>
                   {step === 2 ? "Validate Data" : step === 3 ? "Complete Import" : "Next Step"}
                   <ArrowRight className="h-4 w-4 ml-2" />
                 </>
               )}
             </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
