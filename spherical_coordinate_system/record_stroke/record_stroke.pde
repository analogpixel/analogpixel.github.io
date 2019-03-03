import java.awt.*;
import java.awt.event.*;
import java.awt.datatransfer.*;
import javax.swing.*;
import java.io.*;

ArrayList<PVector> points = new ArrayList<PVector>();


void setup() {
  size(400,400);
  
}

void draw() {
  background(255);
  
  for (int i=0; i < points.size();i++) {
    PVector tmp = (PVector) points.get(i);
    ellipse(tmp.x, tmp.y, 2,2);
  }
  
}

void mouseDragged() {
  // put 0,0 in the bottom right corner
  
  points.add( new PVector(mouseX, mouseY) );
  
  //println(mouseX,  width-mouseY);
}

void keyPressed() {
   String s = "[";
   
   for (int i=0; i < points.size();i++) {
     PVector tmp = (PVector) points.get(i);
     s = s + "[" + Float.toString(tmp.x) + "," + Float.toString(width-tmp.y) + "],";
     
   }
 
   Clipboard clipboard =  Toolkit.getDefaultToolkit().getSystemClipboard();
   StringSelection data = new StringSelection(s);
   clipboard.setContents(data,data);
 
    println(s);
}
