RUBBER      := rubber
RUBBERFLAGS := --pdf


.PHONY: __FORCE__ 

all: pdf/<%= filename %>.pdf clean

pdf/:
	mkdir -p $@

pdf/%.pdf: %.tex __FORCE__ | pdf/ 
	$(RUBBER) $(RUBBERFLAGS) --into pdf $<

.PHONY: clean
clean:
	-$(RM) **/*.rubbercache **/*.aux **/*.log **/*.out **/*.toc
